package com.animais.api.animal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class AnimalService {

    @Autowired
    private AnimalRepository repository;

    public Animal getAnimal(final Integer id){
        return repository.findById(id).orElse(null);
    }

    public List<Animal> getAll(){
        return repository.findAll();
    }

    public Animal save(final Animal animal){
        repository.save(animal);
        return animal;
    }

    public void delete(final Integer id){
        repository.deleteById(id);
    }

}
