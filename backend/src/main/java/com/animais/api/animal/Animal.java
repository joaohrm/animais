package com.animais.api.animal;

import javax.persistence.*;

@Table(name = "animal")
@Entity
public class Animal extends Pagina {

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
