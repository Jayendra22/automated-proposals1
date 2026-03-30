package com.automata.proposal.controller;

import com.automata.proposal.model.ProposalStatus;
import com.automata.proposal.model.Proposal;
import com.automata.proposal.service.ProposalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/proposals")
public class ProposalController {

    private final ProposalService proposalService;

    @Autowired
    public ProposalController(ProposalService proposalService) {
        this.proposalService = proposalService;
    }

    @GetMapping
    public List<Proposal> getAllProposals() {
        return proposalService.getAllProposals();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Proposal> getProposalById(@PathVariable Long id) {
        return proposalService.getProposalById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Proposal createProposal(@RequestBody Proposal proposal) {
        return proposalService.createProposal(proposal);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Proposal> updateProposal(@PathVariable Long id, @RequestBody Proposal proposalDetails) {
        try {
            Proposal updatedProposal = proposalService.updateProposal(id, proposalDetails);
            return ResponseEntity.ok(updatedProposal);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateProposalStatus(@PathVariable Long id, @RequestBody Map<String, String> statusUpdate) {
        try {
            ProposalStatus status = ProposalStatus.valueOf(statusUpdate.get("status"));
            Proposal updatedProposal = proposalService.updateProposalStatus(id, status);
            return ResponseEntity.ok(updatedProposal);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid status value"));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProposal(@PathVariable Long id) {
        try {
            proposalService.deleteProposal(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
