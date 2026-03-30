package com.automata.proposal.config;

import com.automata.proposal.model.Proposal;
import com.automata.proposal.model.ProposalStatus;
import com.automata.proposal.repository.ProposalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private ProposalRepository proposalRepository;

    @Override
    public void run(String... args) throws Exception {
        if (proposalRepository.count() == 0) {
            seedProposals();
        }
    }

    private void seedProposals() {
        List<Proposal> sampleProposals = Arrays.asList(
            new Proposal(null, "Exploring the Equivalence of DFA and NFA", "Dr. Alan Turing", 
                "This proposal aims to develop a visual and algorithmic tool to demonstrate the equivalence between Deterministic Finite Automata (DFA) and Non-deterministic Finite Automata (NFA).",
                "1. Implement an algorithm to convert any NFA to an equivalent DFA. 2. Create a user-friendly interface to visualize the conversion process. 3. Conduct a comparative analysis of the performance of equivalent automata.", 
                Arrays.asList("DFA", "NFA", "Regular Expressions"), ProposalStatus.APPROVED),

            new Proposal(null, "A Turing Machine for Recognizing Palindromes", "Ada Lovelace", 
                "This research will focus on designing and implementing a standard Turing Machine that can recognize palindromic strings over the alphabet {0, 1}.",
                "1. Define the formal 7-tuple for the Turing Machine. 2. Simulate the machine\'s execution on various input strings. 3. Analyze the time and space complexity of the designed machine.", 
                Arrays.asList("Turing Machines"), ProposalStatus.SUBMITTED),

            new Proposal(null, "Context-Free Grammar for Arithmetic Expressions", "John Backus", 
                "The objective is to define a Context-Free Grammar (CFG) that can generate all valid arithmetic expressions involving addition, subtraction, multiplication, and division.",
                "1. Specify the production rules for the grammar. 2. Construct parse trees for sample expressions. 3. Discuss the ambiguity of the grammar and propose solutions.", 
                Arrays.asList("CFG", "Pushdown Automata (PDA)"), ProposalStatus.DRAFT),

            new Proposal(null, "Minimization of Deterministic Finite Automata", "Grace Hopper", 
                "This proposal outlines a plan to implement Hopcroft\'s algorithm for DFA minimization, providing a tool for creating the most efficient automaton for a given regular language.",
                "1. Implement the table-filling algorithm to find distinguishable states. 2. Merge indistinguishable states to form the minimized DFA. 3. Test the algorithm with a set of complex DFAs.", 
                Arrays.asList("DFA", "Regular Expressions"), ProposalStatus.REJECTED)
        );

        proposalRepository.saveAll(sampleProposals);
        System.out.println("Database seeded with " + sampleProposals.size() + " sample proposals.");
    }
}
