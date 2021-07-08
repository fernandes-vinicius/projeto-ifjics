package br.edu.ifrn.projetoifjics.app.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.edu.ifrn.projetoifjics.app.enums.StatusEnum;
import br.edu.ifrn.projetoifjics.app.models.PontuacaoParcial;
import br.edu.ifrn.projetoifjics.app.repositories.PontuacaoParcialRepository;

@Service
public class PontuacaoParcialService {

	@Autowired
	private PontuacaoParcialRepository repository;

	public List<PontuacaoParcial> findAll() {
		return repository.findAll();
	}

	public PontuacaoParcial findById(Long id) {
		return repository.getOne(id);
	}

	public PontuacaoParcial save(PontuacaoParcial pontuacaoParcial) {
		return repository.saveAndFlush(pontuacaoParcial);
	}

	public void delete(PontuacaoParcial pontuacaoParcial) {
		repository.delete(pontuacaoParcial);
	}

	public void deleteById(Long id) {
		repository.deleteById(id);
	}

	public void remove(Long id) {
		PontuacaoParcial c = this.findById(id);
		c.setStatus(StatusEnum.INATIVO);
		this.save(c);
	}

	public List<PontuacaoParcial> findAllByStatus(StatusEnum status) {
		return repository.findAllByStatus(status);
	}

	public List<PontuacaoParcial> findAllByPartida(Long id, StatusEnum status) {
		return repository.findAllByPartida(id, status);
	}

	public Long count() {
		return repository.count();
	}

}
