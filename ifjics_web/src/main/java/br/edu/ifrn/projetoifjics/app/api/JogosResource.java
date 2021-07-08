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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.edu.ifrn.projetoifjics.app.models.Jogos;
import br.edu.ifrn.projetoifjics.app.services.CampusService;
import br.edu.ifrn.projetoifjics.app.services.JogosService;
import br.edu.ifrn.projetoifjics.app.services.ModalidadeService;

@RestController
@RequestMapping("/api/v1/jogos")
public class JogosResource {

	@Autowired
	private JogosService jogosService;

	@Autowired
	private ModalidadeService modalidadeService;

	@Autowired
	private CampusService campusService;

	@GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> findAll() {

		List<Jogos> jogosList = jogosService.findAllByStatus(ATIVO);
		if (jogosList.isEmpty())
			return new ResponseEntity<List<?>>(HttpStatus.NO_CONTENT);

		Collections.reverse(jogosList);
		return new ResponseEntity<List<?>>(jogosList, HttpStatus.OK);
	}

	@GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> findById(@PathVariable Long id) {

		Jogos jogos = jogosService.findById(id);
		if (jogos == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(jogos);
	}

	// @PreAuthorize("hasAnyRole('ADM', 'MOD')")
	@PostMapping
	public ResponseEntity<?> save(@Valid @RequestBody Jogos jogos) {
		jogosService.save(jogos);
		return new ResponseEntity<>(jogos, HttpStatus.CREATED);
	}

	// @PreAuthorize("hasAnyRole('ADM', 'MOD')")
	@PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody Jogos jogos) {

		Jogos jogosdb = jogosService.findById(id);
		if (jogosdb == null)
			return ResponseEntity.notFound().build();

		BeanUtils.copyProperties(jogos, jogosdb, "id");
		jogosdb = jogosService.save(jogosdb);

		return ResponseEntity.ok(jogosdb);
	}

	// @PreAuthorize("hasAnyRole('ADM', 'MOD')")
	@DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> deleteById(@PathVariable Long id) {

		Jogos jogosdb = jogosService.findById(id);
		if (jogosdb == null)
			return ResponseEntity.notFound().build();

		jogosService.remove(id);
		return ResponseEntity.ok(HttpStatus.OK);
	}

	@GetMapping(value = "/jogo", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> search(@RequestParam("s") String search) {

		List<Jogos> jogosList = jogosService.search("%" + search.toLowerCase() + "%", ATIVO);

		if (jogosList.isEmpty())
			return new ResponseEntity<List<?>>(HttpStatus.NO_CONTENT);

		return new ResponseEntity<List<?>>(jogosList, HttpStatus.OK);

	}

}
