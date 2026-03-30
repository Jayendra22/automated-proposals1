package com.automata.proposal.service;

import com.automata.proposal.model.ProposalStatus;
import com.automata.proposal.model.Proposal;
import com.automata.proposal.repository.ProposalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProposalService {

    private final ProposalRepository proposalRepository;

    @Autowired
    public ProposalService(ProposalRepository proposalRepository) {
        this.proposalRepository = proposalRepository;
    }

    public List<Proposal> getAllProposals() {
        return proposalRepository.findAll();
    }

    public Optional<Proposal> getProposalById(Long id) {
        return proposalRepository.findById(id);
    }

    public Proposal createProposal(Proposal proposal) {
        return proposalRepository.save(proposal);
    }

    public Proposal updateProposal(Long id, Proposal proposalDetails) {
        Proposal proposal = proposalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Proposal not found with id: " + id));

        proposal.setTitle(proposalDetails.getTitle());
        proposal.setAuthor(proposalDetails.getAuthor());
        proposal.setDescription(proposalDetails.getDescription());
        proposal.setObjectives(proposalDetails.getObjectives());
        proposal.setAutomataConcepts(proposalDetails.getAutomataConcepts());
        proposal.setStatus(proposalDetails.getStatus());

        return proposalRepository.save(proposal);
    }

    public Proposal updateProposalStatus(Long id, ProposalStatus status) {
        Proposal proposal = proposalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Proposal not found with id: " + id));
        proposal.setStatus(status);
        return proposalRepository.save(proposal);
    }

    public void deleteProposal(Long id) {
        Proposal proposal = proposalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Proposal not found with id: " + id));
        proposalRepository.delete(proposal);
    }
}
