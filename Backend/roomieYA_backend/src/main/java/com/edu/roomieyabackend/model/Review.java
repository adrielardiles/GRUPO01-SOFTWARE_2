package com.edu.roomieyabackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    private String username; // Cambié user a username

    private boolean reportado;

    private String reason;

    // Getters y Setters
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getContent() { return content; }

    public void setContent(String content) { this.content = content; }

    public String getUsername() { return username; }

    public void setUsername(String username) { this.username = username; }

    public boolean isReportado() { return reportado; }

    public void setReportado(boolean reportado) { this.reportado = reportado; }

    public String getReason() { return reason; }

    public void setReason(String reason) { this.reason = reason; }
}
