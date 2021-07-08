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

import br.edu.ifrn.projetoifjics.app.models.Regulamento;
import br.edu.ifrn.projetoifjics.app.services.RegulamentoService;

@RestController
@RequestMapping("/api/v1/regulamentos")
public class RegulamentoResource {

	@Autowired
    private RegulamentoService regulamentoService;

	@GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> findAll() {

        List<Regulamento> regulamento = regulamentoService.findAllByStatus(ATIVO);
		if (regulamento.isEmpty())
			return new ResponseEntity<List<?>>(HttpStatus.NO_CONTENT);

		Collections.reverse(regulamento);
		return new ResponseEntity<List<?>>(regulamento, HttpStatus.OK);
	}

	@GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> findById(@PathVariable Long id) {

        Regulamento Regulamento = regulamentoService.findById(id);
        if (Regulamento == null)
			return ResponseEntity.notFound().build();
        return ResponseEntity.ok(Regulamento);
	}

	// @PreAuthorize("hasAnyRole('ADM', 'MOD')")
	@PostMapping
    public ResponseEntity<?> save(@Valid @RequestBody Regulamento Regulamento) {
        regulamentoService.save(Regulamento);
        return new ResponseEntity<>(Regulamento, HttpStatus.CREATED);
	}

	// @PreAuthorize("hasAnyRole('ADM', 'MOD')")
	@PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody Regulamento
 Regulamento) {

        Regulamento Regulamentodb = regulamentoService.findById(id);
        if (Regulamentodb == null)
			return ResponseEntity.notFound().build();

        BeanUtils.copyProperties(Regulamento, Regulamentodb, "id");
        Regulamentodb = regulamentoService.save(Regulamentodb);

        return ResponseEntity.ok(Regulamentodb);
	}

	// @PreAuthorize("hasAnyRole('ADM', 'MOD')")
	@DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> deleteById(@PathVariable Long id) {

        Regulamento Regulamentodb = regulamentoService.findById(id);
        if (Regulamentodb == null)
			return ResponseEntity.notFound().build();

        regulamentoService.remove(id);
		return ResponseEntity.ok(HttpStatus.OK);
	}

}
