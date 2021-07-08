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

import br.edu.ifrn.projetoifjics.app.models.Campus;
import br.edu.ifrn.projetoifjics.app.services.CampusService;

@RestController
@RequestMapping("/api/v1/campi")
public class CampusResource {

	@Autowired
	private CampusService campusService;

	@GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> findAll() {

		List<Campus> campi = campusService.findAllByStatus(ATIVO);
		if (campi.isEmpty())
			return new ResponseEntity<List<?>>(HttpStatus.NO_CONTENT);

		Collections.reverse(campi);
		return new ResponseEntity<List<?>>(campi, HttpStatus.OK);
	}

	@GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> findById(@PathVariable Long id) {

		Campus campus = campusService.findById(id);
		if (campus == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(campus);
	}

	// @PreAuthorize("hasAnyRole('ADM', 'MOD')")
	@PostMapping
	public ResponseEntity<?> save(@Valid @RequestBody Campus campus) {
		campusService.save(campus);
		return new ResponseEntity<>(campus, HttpStatus.CREATED);
	}

	// @PreAuthorize("hasAnyRole('ADM', 'MOD')")
	@PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody Campus campus) {

		Campus campusdb = campusService.findById(id);
		if (campusdb == null)
			return ResponseEntity.notFound().build();

		BeanUtils.copyProperties(campus, campusdb, "id");
		campusdb = campusService.save(campusdb);

		return ResponseEntity.ok(campusdb);
	}

	// @PreAuthorize("hasAnyRole('ADM', 'MOD')")
	@DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> deleteById(@PathVariable Long id) {

		Campus campusdb = campusService.findById(id);
		if (campusdb == null)
			return ResponseEntity.notFound().build();

		campusService.remove(id);
		return ResponseEntity.ok(HttpStatus.OK);
	}

}
