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

import br.edu.ifrn.projetoifjics.app.models.PontuacaoParcial;
import br.edu.ifrn.projetoifjics.app.services.PontuacaoParcialService;

@RestController
@RequestMapping("/api/v1/pontuacaoparcial")
public class PontuacaoParcialResource {

	@Autowired
	private PontuacaoParcialService PontuacaoParcialService;

	@GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> findAll() {

		List<PontuacaoParcial> PontuacaoParcial = PontuacaoParcialService.findAllByStatus(ATIVO);
		if (PontuacaoParcial.isEmpty())
			return new ResponseEntity<List<?>>(HttpStatus.NO_CONTENT);

		Collections.reverse(PontuacaoParcial);
		return new ResponseEntity<List<?>>(PontuacaoParcial, HttpStatus.OK);
	}

	@GetMapping(value = "/partida/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> findAllByPartida(@PathVariable Long id) {

		List<PontuacaoParcial> PontuacaoParcial = PontuacaoParcialService.findAllByPartida(id, ATIVO);
		if (PontuacaoParcial.isEmpty())
			return new ResponseEntity<List<?>>(HttpStatus.NO_CONTENT);

		return new ResponseEntity<List<?>>(PontuacaoParcial, HttpStatus.OK);
	}

	@GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> findById(@PathVariable Long id) {

		PontuacaoParcial PontuacaoParcial = PontuacaoParcialService.findById(id);
		if (PontuacaoParcial == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(PontuacaoParcial);
	}

	// @PreAuthorize("hasAnyRole('ADM', 'MOD')")
	@PostMapping
	public ResponseEntity<?> save(@Valid @RequestBody PontuacaoParcial PontuacaoParcial) {
		PontuacaoParcialService.save(PontuacaoParcial);
		return new ResponseEntity<>(PontuacaoParcial, HttpStatus.CREATED);
	}

	// @PreAuthorize("hasAnyRole('ADM', 'MOD')")
	//@PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	//public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody PontuacaoParcial PontuacaoParcial) {
	//PontuacaoParcial PontuacaoParcialdb = PontuacaoParcialService.findById(id);
	//if (PontuacaoParcialdb == null)
	//	return ResponseEntity.notFound().build();

	//BeanUtils.copyProperties(PontuacaoParcial, PontuacaoParcialdb, "id");
	//PontuacaoParcialdb = PontuacaoParcialService.save(PontuacaoParcialdb);
	//return ResponseEntity.ok(PontuacaoParcialdb);
//}


	// @PreAuthorize("hasAnyRole('ADM', 'MOD')")
	@DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> deleteById(@PathVariable Long id) {

		PontuacaoParcial PontuacaoParcialdb = PontuacaoParcialService.findById(id);
		if (PontuacaoParcialdb == null)
			return ResponseEntity.notFound().build();

		PontuacaoParcialService.remove(id);
		return ResponseEntity.ok(HttpStatus.OK);
	}

}