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

import br.edu.ifrn.projetoifjics.app.models.Competicao;
import br.edu.ifrn.projetoifjics.app.models.Pontuacao;
import br.edu.ifrn.projetoifjics.app.services.CompeticaoService;
import br.edu.ifrn.projetoifjics.app.services.PontuacaoService;

@RestController
@RequestMapping("/api/v1/competicoes")
public class CompeticaoResource {

	@Autowired
	private CompeticaoService competicaoService;

	@Autowired
	private PontuacaoService pontuacaoService;

	@GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> findAll() {

		List<Competicao> competicoes = competicaoService.findAllByStatus(ATIVO);
		if (competicoes.isEmpty())
			return new ResponseEntity<List<?>>(HttpStatus.NO_CONTENT);

		Collections.reverse(competicoes);
		return new ResponseEntity<List<?>>(competicoes, HttpStatus.OK);
	}

	@GetMapping(value = "/jogos/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> findAllByJogos(@PathVariable Long id) {

		List<Competicao> competicoes = competicaoService.findAllByJogos(id, ATIVO);
		if (competicoes.isEmpty())
			return new ResponseEntity<List<?>>(HttpStatus.NO_CONTENT);

		return new ResponseEntity<List<?>>(competicoes, HttpStatus.OK);
	}

	@GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> findById(@PathVariable Long id) {

		Competicao competicao = competicaoService.findById(id);
		if (competicao == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(competicao);
	}

	// @PreAuthorize("hasAnyRole('ADM', 'MOD')")
	@PostMapping
	public ResponseEntity<?> save(@Valid @RequestBody Competicao competicao) {
		competicaoService.save(competicao);

		// List<Pontuacao> pontuacoes = competicao.getPontuacoes();
		// if (pontuacoes != null) {
		// for (Pontuacao p : pontuacoes) {
		// p.setCompeticao(competicao);
		// pontuacaoService.save(p);
		// }
		// }

		return new ResponseEntity<>(competicao, HttpStatus.CREATED);
	}

	// @PreAuthorize("hasAnyRole('ADM', 'MOD')")
	@PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody Competicao competicao) {
		Competicao competicaodb = competicaoService.findById(id);
		if (competicaodb == null)
			return ResponseEntity.notFound().build();

		BeanUtils.copyProperties(competicao, competicaodb, "id");
		competicaodb = competicaoService.save(competicaodb);

		List<Pontuacao> pontuacoes = competicaodb.getPontuacoes();
		if (pontuacoes != null) {

			for (Pontuacao p : pontuacoes) {

				if (p.getColocacao() == 1)
					p.setOuro(p.getPontos());
				else if (p.getColocacao() == 2)
					p.setPrata(p.getPontos());
				else if (p.getColocacao() == 3)
					p.setBronze(p.getPontos());

				p.setCompeticao(competicaodb);
				pontuacaoService.save(p);
			}
		}

		return ResponseEntity.ok(competicaodb);
	}

	// @PreAuthorize("hasAnyRole('ADM', 'MOD')")
	@DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> deleteById(@PathVariable Long id) {

		Competicao competicaodb = competicaoService.findById(id);
		if (competicaodb == null)
			return ResponseEntity.notFound().build();

		competicaoService.remove(id);
		return ResponseEntity.ok(HttpStatus.OK);
	}

	@GetMapping(value = "/competicao", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> search(@RequestParam("s") String search) {

		List<Competicao> competicaoList = competicaoService.search("%" + search.toLowerCase() + "%", ATIVO);

		if (competicaoList.isEmpty())
			return new ResponseEntity<List<?>>(HttpStatus.NO_CONTENT);

		return new ResponseEntity<List<?>>(competicaoList, HttpStatus.OK);

	}

}
