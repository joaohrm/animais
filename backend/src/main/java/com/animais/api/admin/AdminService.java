package com.animais.api.admin;

import com.animais.api.animal.Animal;
import com.animais.api.animal.AnimalRepository;
import com.animais.api.animal.AnimalService;
import com.animais.api.animal.Tipo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import java.util.List;

@Service
public class AdminService {

    private final Path fileStorageLocation;

    @Autowired
    private AdminRepository repository;

    @Autowired
    private AnimalService animalService;

    @Autowired
    public AdminService(Environment env) {
        this.fileStorageLocation = Paths.get(env.getProperty("app.file.upload-dir", "./uploads/files"))
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException(
                    "Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    private String getFileExtension(String fileName) {
        if (fileName == null) {
            return null;
        }
        String[] fileNameParts = fileName.split("\\.");

        return fileNameParts[fileNameParts.length - 1];
    }

    public byte[] getFile(final Integer id) throws IOException {
        final Admin file = repository.findById(id).orElseThrow(null);
        String fullPath = this.fileStorageLocation + "\\" + file.getUrl();
        return Files.readAllBytes(new File(fullPath).toPath());
    }

    public List<Admin> getAllFiles() {
        final List<Admin> files = repository.findAll();
        return files;
    }

    public String storeFile(final MultipartFile file) {
        final String fileName = new Date().getTime() + "." + getFileExtension(file.getOriginalFilename());
        try {
            if (fileName.contains("..")) {
                throw new RuntimeException(
                        "Sorry! Filename contains invalid path sequence " + fileName);
            }

            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public Admin save(final String adminFile, final String nome) {
        final Admin admin = new Admin();
        final String nomeAjustado = nome.toLowerCase();
        admin.setNome(nomeAjustado);
        admin.setTipo(Tipo.PALAVRA);
        admin.setUrl(adminFile);
        repository.save(admin);

        //TODO: ajustar serviço ou tabela
        final Animal animal = new Animal();
        animal.setNome(nomeAjustado);
        animal.setTipo(Tipo.PALAVRA);
        animal.setNumero(1);
        animal.setUrl(null);
        animal.setTexto(null);
        animalService.save(animal);

        return admin;
    }

    public void delete(final Integer id){
        repository.deleteById(id);
        animalService.delete(id);
    }
}
