package com.automata.proposal.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "proposals")
public class Proposal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String objectives;

    @ElementCollection
    @CollectionTable(name = "proposal_concepts", joinColumns = @JoinColumn(name = "proposal_id"))
    @Column(name = "concept")
    private List<String> automataConcepts;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProposalStatus status = ProposalStatus.DRAFT;

    public Proposal() {}

    public Proposal(Long id, String title, String author, String description, String objectives, List<String> automataConcepts, ProposalStatus status) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.objectives = objectives;
        this.automataConcepts = automataConcepts;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getObjectives() {
        return objectives;
    }

    public void setObjectives(String objectives) {
        this.objectives = objectives;
    }

    public List<String> getAutomataConcepts() {
        return automataConcepts;
    }

    public void setAutomataConcepts(List<String> automataConcepts) {
        this.automataConcepts = automataConcepts;
    }

    public ProposalStatus getStatus() {
        return status;
    }

    public void setStatus(ProposalStatus status) {
        this.status = status;
    }
}
