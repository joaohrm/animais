package com.animais.api.admin;

import com.animais.api.animal.Tipo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Admin {

    @Id
    @GeneratedValue(generator = "increment")
    private int id;
    private String nome;
    private String url;
    private Tipo tipo;

    public int getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getUrl() {
        return url;
    }

    public Tipo getTipo() {
        return tipo;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setTipo(Tipo tipo) {
        this.tipo = tipo;
    }



}
