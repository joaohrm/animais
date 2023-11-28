package com.animais.api.animal;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AnimalResourceTest {

    @Mock
    private AnimalService service;

    @InjectMocks
    private AnimalResource animalResource;


    @BeforeEach
    public void init() {
            MockitoAnnotations.openMocks(this);
    }

    @DisplayName("JUnit teste para AnimalResource")
    @Test
    public void getAnimal(){
        animalResource.getById(1);
        verify(service, times(1)).getAnimal(any());
    }

}
