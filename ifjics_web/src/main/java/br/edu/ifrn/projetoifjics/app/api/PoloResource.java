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

import br.edu.ifrn.projetoifjics.app.models.Polo;
import br.edu.ifrn.projetoifjics.app.services.PoloService;

@RestController
@RequestMapping("/api/v1/polos")
public class PoloResource {

	@Autowired
	private PoloService PoloService;

	@GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> findAll() {

		List<Polo> polos = PoloService.findAllByStatus(ATIVO);
		if (polos.isEmpty())
			return new ResponseEntity<List<?>>(HttpStatus.NO_CONTENT);

		Collections.reverse(polos);
		return new ResponseEntity<List<?>>(polos, HttpStatus.OK);
	}

	@GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> findById(@PathVariable Long id) {

		Polo Polo = PoloService.findById(id);
		if (Polo == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(Polo);
	}

	// @PreAuthorize("hasAnyRole('ADM', 'MOD')")
	@PostMapping
	public ResponseEntity<?> save(@Valid @RequestBody Polo Polo) {
		PoloService.save(Polo);
		return new ResponseEntity<>(Polo, HttpStatus.CREATED);
	}

	// @PreAuthorize("hasAnyRole('ADM', 'MOD')")
	@PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody Polo Polo) {

		Polo Polodb = PoloService.findById(id);
		if (Polodb == null)
			return ResponseEntity.notFound().build();

		BeanUtils.copyProperties(Polo, Polodb, "id");
		Polodb = PoloService.save(Polodb);

		return ResponseEntity.ok(Polodb);
	}

	// @PreAuthorize("hasAnyRole('ADM', 'MOD')")
	@DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> deleteById(@PathVariable Long id) {

		Polo Polodb = PoloService.findById(id);
		if (Polodb == null)
			return ResponseEntity.notFound().build();

		PoloService.remove(id);
		return ResponseEntity.ok(HttpStatus.OK);
	}

}
