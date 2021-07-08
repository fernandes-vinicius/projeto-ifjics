package br.edu.ifrn.projetoifjics.app.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.edu.ifrn.projetoifjics.app.enums.StatusEnum;
import br.edu.ifrn.projetoifjics.app.models.Pontuacao;
import br.edu.ifrn.projetoifjics.app.repositories.PontuacaoRepository;

@Service
public class PontuacaoService {

	@Autowired
	private PontuacaoRepository repository;

	public List<Pontuacao> findAll() {
		return repository.findAll();
	}

	public Pontuacao findById(Long id) { 
		return repository.getOne(id);
	}

	public Pontuacao save(Pontuacao pontuacao) {
		return repository.saveAndFlush(pontuacao);
	}

	public void delete(Pontuacao pontuacao) {
		repository.delete(pontuacao);
	}

	public void deleteById(Long id) {
		repository.deleteById(id);
	}

	public void remove(Long id) {
		Pontuacao c = this.findById(id);
		c.setStatus(StatusEnum.INATIVO);
		this.save(c);
	}

	public List<Pontuacao> findAllByStatus(StatusEnum status) {
		return repository.findAllByStatus(status);
	}

	public Long count() {
		return repository.count();
	}

}
