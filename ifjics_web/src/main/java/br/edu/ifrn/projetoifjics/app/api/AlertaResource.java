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

import br.edu.ifrn.projetoifjics.app.models.Alerta;
import br.edu.ifrn.projetoifjics.app.services.AlertaService;

@RestController
@RequestMapping("/api/v1/alertas")
public class AlertaResource {

	@Autowired
	private AlertaService AlertaService;

	@GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> findAll() {

		List<Alerta> alertas = AlertaService.findAllByStatus(ATIVO);
		if (alertas.isEmpty())
			return new ResponseEntity<List<?>>(HttpStatus.NO_CONTENT);

		Collections.reverse(alertas);
		return new ResponseEntity<List<?>>(alertas, HttpStatus.OK);
	}

	@GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> findById(@PathVariable Long id) {

		Alerta Alerta = AlertaService.findById(id);
		if (Alerta == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(Alerta);
	}

	// @PreAuthorize("hasAnyRole('ADM', 'MOD')")
	@PostMapping
	public ResponseEntity<?> save(@Valid @RequestBody Alerta Alerta) {
		AlertaService.save(Alerta);
		return new ResponseEntity<>(Alerta, HttpStatus.CREATED);
	}

	// @PreAuthorize("hasAnyRole('ADM', 'MOD')")
	@PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody Alerta Alerta) {

		Alerta Alertadb = AlertaService.findById(id);
		if (Alertadb == null)
			return ResponseEntity.notFound().build();

		BeanUtils.copyProperties(Alerta, Alertadb, "id");
		Alertadb = AlertaService.save(Alertadb);

		return ResponseEntity.ok(Alertadb);
	}

	// @PreAuthorize("hasAnyRole('ADM', 'MOD')")
	@DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> deleteById(@PathVariable Long id) {

		Alerta Alertadb = AlertaService.findById(id);
		if (Alertadb == null)
			return ResponseEntity.notFound().build();

		AlertaService.remove(id);
		return ResponseEntity.ok(HttpStatus.OK);
	}

}
