package br.edu.ifrn.projetoifjics.app.api;

import static br.edu.ifrn.projetoifjics.app.enums.StatusEnum.ATIVO;

import java.util.Collections;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.edu.ifrn.projetoifjics.app.models.Recorde;
import br.edu.ifrn.projetoifjics.app.services.RecordeService;

@RestController
@RequestMapping("/api/v1/recordes")
public class RecordeResource {

	@Autowired
    private RecordeService RecordeService;

	@GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> findAll() {

        List<Recorde> Recorde = RecordeService.findAllByStatus(ATIVO);
		if (Recorde.isEmpty())
			return new ResponseEntity<List<?>>(HttpStatus.NO_CONTENT);

		Collections.reverse(Recorde);
		return new ResponseEntity<List<?>>(Recorde, HttpStatus.OK);
	}

	@GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> findById(@PathVariable Long id) {

        Recorde Recorde = RecordeService.findById(id);
        if (Recorde == null)
			return ResponseEntity.notFound().build();
        return ResponseEntity.ok(Recorde);
	}

	// @PreAuthorize("hasAnyRole('ADM', 'MOD')")
	@PostMapping
    public ResponseEntity<?> save(@Valid @RequestBody Recorde Recorde) {
        RecordeService.save(Recorde);
        return new ResponseEntity<>(Recorde, HttpStatus.CREATED);
	}

	// @PreAuthorize("hasAnyRole('ADM', 'MOD')")
	@PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody Recorde Recorde) {

        Recorde Recordedb = RecordeService.findById(id);
        if (Recordedb == null)
			return ResponseEntity.notFound().build();

        BeanUtils.copyProperties(Recorde, Recordedb, "id");
        Recordedb = RecordeService.save(Recordedb);

        return ResponseEntity.ok(Recordedb);
	}

	// @PreAuthorize("hasAnyRole('ADM', 'MOD')")
	@DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> deleteById(@PathVariable Long id) {

        Recorde Recordedb = RecordeService.findById(id);
        if (Recordedb == null)
			return ResponseEntity.notFound().build();

        RecordeService.remove(id);
		return ResponseEntity.ok(HttpStatus.OK);
	}

}
