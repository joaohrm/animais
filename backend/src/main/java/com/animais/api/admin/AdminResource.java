package com.animais.api.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/admin")
public class AdminResource {

    private final AdminService service;

    @Autowired
    public AdminResource(AdminService service) {
        this.service = service;
    }

    public static String UPLOAD_DIRECTORY = "src/main/resources/uploaded";

    @GetMapping("{id}")
    @CrossOrigin
    public ResponseEntity<byte[]> find(@PathVariable final Integer id) throws IOException {
        final byte[] file = service.getFile(id);
        if (file == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        /*final String response = ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .path("/uploads/files/")
                .path(file.getUrl())
                .toUriString();/*

        //return ResponseEntity.status(HttpStatus.OK).body(response);

        /*final String contentType = "application/octet-stream";
        final String headerValue = "attachment; filename=\"" + file.getNome() + "\"";

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, headerValue)
                .body(file);*/

        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/png")).body(file);
    }

    @GetMapping("")
    @CrossOrigin
    public ResponseEntity<List<Admin>> findAll() {
        final List<Admin> lista = service.getAllFiles();

        if (lista == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        //lista.stream().forEach(arquivo -> arquivo.setUrl(/*UPLOAD_DIRECTORY + */arquivo.getUrl()));

        lista.stream().forEach(arquivo -> arquivo.setUrl(
                ServletUriComponentsBuilder
                        .fromCurrentContextPath()
                        .path("/uploads/files/")
                        .path(arquivo.getUrl())
                        .toUriString())
        );

        /*String fileDownloadUri = ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .path("/uploads/files/")
                .path(dbFile.getId())
                .toUriString();*/


        /*return new ResponseFile(
                dbFile.getName(),
                fileDownloadUri,
                dbFile.getType(),
                dbFile.getData().length);
    }).collect(Collectors.toList());*/

        return ResponseEntity.status(HttpStatus.OK).body(lista);
    }

    @PostMapping("")
    public ResponseEntity<Admin> uploadImage(@RequestParam("file") MultipartFile file, @RequestParam("nome") String nome) {
        String fileName = service.storeFile(file);
        return ResponseEntity.ok().body(service.save(fileName, nome));
    }

    @DeleteMapping("{id}")
    @CrossOrigin
    public void delete(@PathVariable final Integer id){
        service.delete(id);
    }

}
