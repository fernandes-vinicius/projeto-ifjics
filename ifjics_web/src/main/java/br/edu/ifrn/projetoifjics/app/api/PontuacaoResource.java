package br.edu.ifrn.projetoifjics.app.api;

import static br.edu.ifrn.projetoifjics.app.enums.StatusEnum.*;

import java.util.ArrayList;
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
import br.edu.ifrn.projetoifjics.app.models.Competicao;
import br.edu.ifrn.projetoifjics.app.models.Jogos;
import br.edu.ifrn.projetoifjics.app.models.Pontuacao;
import br.edu.ifrn.projetoifjics.app.services.JogosService;
import br.edu.ifrn.projetoifjics.app.services.PontuacaoService;

@RestController
@RequestMapping("/api/v1/pontuacoes")
public class PontuacaoResource {

	@Autowired
	private PontuacaoService pontuacaoService;

	@Autowired
	private JogosService jogosService;

	@GetMapping(produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> findAll() {

		List<Pontuacao> pontuacoes = pontuacaoService.findAllByStatus(ATIVO);
		if (pontuacoes.isEmpty())
			return new ResponseEntity<List<?>>(HttpStatus.NO_CONTENT);

		Collections.reverse(pontuacoes);
		return new ResponseEntity<List<?>>(pontuacoes, HttpStatus.OK);
	}

	@GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> findById(@PathVariable Long id) {

		Pontuacao pontuacao = pontuacaoService.findById(id);
		if (pontuacao == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(pontuacao);
	}

	// @PreAuthorize("hasAnyRole('ADM', 'MOD')")
	@PostMapping
	public ResponseEntity<?> save(@Valid @RequestBody Pontuacao pontuacao) {
		pontuacaoService.save(pontuacao);
		return new ResponseEntity<>(pontuacao, HttpStatus.CREATED);
	}

	// @PreAuthorize("hasAnyRole('ADM', 'MOD')")
	@PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody Pontuacao pontuacao) {

		Pontuacao pontuacaodb = pontuacaoService.findById(id);
		if (pontuacaodb == null)
			return ResponseEntity.notFound().build();

		BeanUtils.copyProperties(pontuacao, pontuacaodb, "id");
		pontuacaodb = pontuacaoService.save(pontuacaodb);

		return ResponseEntity.ok(pontuacaodb);
	}

	// @PreAuthorize("hasAnyRole('ADM', 'MOD')")
	@DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> deleteById(@PathVariable Long id) {

		Pontuacao pontuacaodb = pontuacaoService.findById(id);
		if (pontuacaodb == null)
			return ResponseEntity.notFound().build();

		pontuacaoService.remove(id);
		return ResponseEntity.ok(HttpStatus.OK);
	}

	@GetMapping(value = "/geral/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> pontuacaoGeral(@PathVariable Long id) {

		Jogos jogos = jogosService.findById(id);

		if (jogos == null)
			return ResponseEntity.notFound().build();

		List<Competicao> competicoes = jogos.getCompeticoes();
		if (competicoes.isEmpty())
			return new ResponseEntity<List<?>>(HttpStatus.NO_CONTENT);

		List<Pontuacao> pontuacoes = new ArrayList<>();
		for (Competicao c : competicoes) {

			for (Pontuacao p : c.getPontuacoes()) {

				Campus campus = p.getCampus();
				boolean contains = pontuacoes.stream().filter(o -> o.getCampus().equals(campus)).findFirst()
						.isPresent();

				if (contains) {

					Pontuacao pontuacao = pontuacoes.stream().filter(o -> o.getCampus().equals(campus)).findFirst()
							.orElse(null);

					if (pontuacao != null) {
						pontuacao.setOuro(p.getOuro() + pontuacao.getOuro());
						pontuacao.setPrata(p.getPrata() + pontuacao.getPrata());
						pontuacao.setBronze(p.getBronze() + pontuacao.getBronze());
						pontuacao.setBonus(p.getBonus() + pontuacao.getBonus());
						pontuacao.setPontos(p.getPontos() + pontuacao.getPontos());
						pontuacao.setTotal(p.getTotal() + pontuacao.getTotal());

						pontuacoes.remove(pontuacao);
						pontuacoes.add(pontuacao);
					}

				} else
					pontuacoes.add(p);
			}
		}

		if (pontuacoes.isEmpty())
			return new ResponseEntity<List<?>>(HttpStatus.NO_CONTENT);

		Collections.sort(pontuacoes, (o1, o2) -> o2.getTotal() - o1.getTotal());
		return new ResponseEntity<List<?>>(pontuacoes, HttpStatus.OK);
	}

	@GetMapping(value = "/competicao/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<?> pontuacaoPorCompeticao(@PathVariable Long id, @RequestBody Competicao competicao) {

		Jogos jogos = jogosService.findById(id);
		if (jogos == null)
			return ResponseEntity.notFound().build();

		boolean contains = jogos.getCompeticoes().contains(competicao);
		if (contains) {

			List<Pontuacao> pontuacoes = competicao.getPontuacoes();
			if (pontuacoes.isEmpty())
				return new ResponseEntity<List<?>>(HttpStatus.NO_CONTENT);

			Collections.sort(pontuacoes, (o1, o2) -> o2.getTotal() - o1.getTotal());
			return new ResponseEntity<List<?>>(pontuacoes, HttpStatus.OK);

		}

		return new ResponseEntity<List<?>>(HttpStatus.NO_CONTENT);
	}
}
