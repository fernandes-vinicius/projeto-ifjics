package br.edu.ifrn.projetoifjics.app.api;

import static br.edu.ifrn.projetoifjics.app.enums.StatusEnum.*;

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

import br.edu.ifrn.projetoifjics.app.models.Modalidade;
import br.edu.ifrn.projetoifjics.app.services.ModalidadeService;

@RestController
@RequestMapping("/api/v1/modalidades")
public class ModalidadeResource {

	@Autowired
	private ModalidadeService modalidadeService;

	@GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> findAll() {

		List<Modalidade> modalidades = modalidadeService.findAllByStatus(ATIVO);
		if (modalidades.isEmpty())
			return new ResponseEntity<List<?>>(HttpStatus.NO_CONTENT);
		
		Collections.reverse(modalidades);
		return new ResponseEntity<List<?>>(modalidades, HttpStatus.OK);
	}

	@GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> findById(@PathVariable Long id) {

		Modalidade modalidade = modalidadeService.findById(id);
		if (modalidade != null)
			return ResponseEntity.ok(modalidade);
		return ResponseEntity.notFound().build();
	}

	// @PreAuthorize("hasAnyRole('ADM', 'MOD')")
	@PostMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> save(@Valid @RequestBody Modalidade modalidade) {
		modalidadeService.save(modalidade);
		return new ResponseEntity<Modalidade>(modalidade, HttpStatus.CREATED);
	}

	// @PreAuthorize("hasAnyRole('ADM', 'MOD')")
	@PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody Modalidade modalidade) {

		Modalidade modalidadedb = modalidadeService.findById(id);
		if (modalidadedb != null) {

			BeanUtils.copyProperties(modalidade, modalidadedb, "id");
			modalidadedb = modalidadeService.save(modalidadedb);

			return ResponseEntity.ok(modalidadedb);
		}
		return ResponseEntity.notFound().build();
	}

	// @PreAuthorize("hasAnyRole('ADM', 'MOD')")
	@DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> deleteById(@PathVariable Long id) {

		Modalidade modalidadedb = modalidadeService.findById(id);
		if (modalidadedb == null)
			return ResponseEntity.notFound().build();

		modalidadeService.remove(id);
		return ResponseEntity.ok(HttpStatus.OK);
	}
}
