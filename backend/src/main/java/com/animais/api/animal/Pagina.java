package com.animais.api.animal;

import javax.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class Pagina {

    private int numero;
    private String texto;

    public int getNumero() {
        return numero;
    }

    public String getTexto() {
        return texto;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    public void setTexto(String tipo) {
        this.texto = texto;
    }
}
