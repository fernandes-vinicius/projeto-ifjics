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

import br.edu.ifrn.projetoifjics.app.models.Partida;
import br.edu.ifrn.projetoifjics.app.models.Pontuacao;
import br.edu.ifrn.projetoifjics.app.services.PartidaService;
import br.edu.ifrn.projetoifjics.app.services.PontuacaoService;

@RestController
@RequestMapping("/api/v1/partida")
public class PartidaResource {

	@Autowired
	private PartidaService PartidaService;

	@Autowired
	private PontuacaoService pontuacaoService;

	@GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> findAll() {

		List<Partida> partidas = PartidaService.findAllByStatus(ATIVO);
		if (partidas.isEmpty())
			return new ResponseEntity<List<?>>(HttpStatus.NO_CONTENT);

		Collections.reverse(partidas);
		return new ResponseEntity<List<?>>(partidas, HttpStatus.OK);
	}

	@GetMapping(value = "/competicao/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> findAllByCompeticao(@PathVariable Long id) {

		List<Partida> partidas = PartidaService.findAllByCompeticao(id, ATIVO);
		if (partidas.isEmpty())
			return new ResponseEntity<List<?>>(HttpStatus.NO_CONTENT);

		return new ResponseEntity<List<?>>(partidas, HttpStatus.OK);
	}

	@GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> findById(@PathVariable Long id) {

		Partida Partida = PartidaService.findById(id);
		if (Partida == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(Partida);
	}

	// @PreAuthorize("hasAnyRole('ADM', 'MOD')")
	@PostMapping
	public ResponseEntity<?> save(@Valid @RequestBody Partida Partida) {
		PartidaService.save(Partida);

		// List<Pontuacao> pontuacoes = Partida.getPontuacoes();
		// if (pontuacoes != null) {
		// for (Pontuacao p : pontuacoes) {
		// p.setPartida(Partida);
		// pontuacaoService.save(p);
		// }
		// }

		return new ResponseEntity<>(Partida, HttpStatus.CREATED);
	}

	// @PreAuthorize("hasAnyRole('ADM', 'MOD')")
	@PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody Partida Partida) {
		Partida Partidadb = PartidaService.findById(id);
		if (Partidadb == null)
			return ResponseEntity.notFound().build();

		BeanUtils.copyProperties(Partida, Partidadb, "id"); 
		Partidadb = PartidaService.save(Partidadb);
		/*
		 * List<Pontuacao> pontuacoes = Partidadb.getPontuacoes(); if (pontuacoes !=
		 * null) {
		 * 
		 * for (Pontuacao p : pontuacoes) {
		 * 
		 * if (p.getColocacao() == 1) p.setOuro(p.getPontos()); else if
		 * (p.getColocacao() == 2) p.setPrata(p.getPontos()); else if (p.getColocacao()
		 * == 3) p.setBronze(p.getPontos());
		 * 
		 * p.setPartida(Partidadb); pontuacaoService.save(p); } }
		 */

		return ResponseEntity.ok(Partidadb);
	}

	// @PreAuthorize("hasAnyRole('ADM', 'MOD')")
	@DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> deleteById(@PathVariable Long id) {

		Partida Partidadb = PartidaService.findById(id);
		if (Partidadb == null)
			return ResponseEntity.notFound().build();

		PartidaService.remove(id);
		return ResponseEntity.ok(HttpStatus.OK);
	}

	@GetMapping(value = "/partida", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> search(@RequestParam("s") String search) {

		List<Partida> partidaList = PartidaService.search("%" + search.toLowerCase() + "%", ATIVO);

		if (partidaList.isEmpty())
			return new ResponseEntity<List<?>>(HttpStatus.NO_CONTENT);

		return new ResponseEntity<List<?>>(partidaList, HttpStatus.OK);

	}

}