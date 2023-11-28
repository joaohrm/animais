package com.animais.api.animal;

import com.animais.api.handler.BusinessException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;


@RestController
@RequestMapping("/animal")
public class AnimalResource {

    @Autowired
    private AnimalService service;

    @GetMapping("{id}")
    @CrossOrigin
    public ResponseEntity<Animal> getById(@PathVariable final Integer id) {
        final Animal animalResponse = service.getAnimal(id);
        if (animalResponse == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        if(animalResponse.getNome().isEmpty()){
            throw new BusinessException("o campo nome é obrigatório");
        }
        return ResponseEntity.status(HttpStatus.OK).body(animalResponse);
    }

    /*@GetMapping("image/{url}")
    @CrossOrigin
    public void getImage(@PathVariable final String url){
            GridFSDBFile gridFsFile = fileService.findUserAccountAvatarById(userId);

        return ResponseEntity.ok()
                .contentLength(gridFsFile.getLength())
                .contentType(MediaType.parseMediaType(gridFsFile.getContentType()))
                .body(new InputStreamResource(gridFsFile.getInputStream()));
    }*/

    @GetMapping("/all")
    @CrossOrigin
    public ResponseEntity<List<Animal>> getList() {
        List<Animal> animais = service.getAll();
        return ResponseEntity.status(HttpStatus.OK).body(animais);
    }

    @PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Animal> createAnimal(@RequestBody final Animal animal) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(animal));
    }

    @PostMapping(value = "/upload")
    @CrossOrigin(origins = "http://localhost:3000/admin")
    public String uploadAnimal(@RequestParam("file") MultipartFile file,
                                               RedirectAttributes redirectAttributes) {
        return "ok";
    }
}
