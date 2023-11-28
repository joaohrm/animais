package com.animais.api.animal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Integer> {
}
/*
insert into animal values(1, 1, '', 'vaca', 1, '');
insert into animal values(2, 2, '', 'coruja', 1, '');
insert into animal values(3, 3, '', 'formiga', 1, '');
 */