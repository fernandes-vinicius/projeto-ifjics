package br.edu.ifrn.projetoifjics.app.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.edu.ifrn.projetoifjics.app.enums.StatusEnum;
import br.edu.ifrn.projetoifjics.app.models.Jogos;
import br.edu.ifrn.projetoifjics.app.repositories.JogosRepository;

@Service
public class JogosService {

	@Autowired
	private JogosRepository repository;

	public List<Jogos> findAll() {
		return repository.findAll();
	}

	public Jogos findById(Long id) {
		return repository.getOne(id);
	}

	public Jogos save(Jogos jogos) {
		return repository.saveAndFlush(jogos);
	}

	public void delete(Jogos jogos) {
		repository.delete(jogos);
	}

	public void deleteById(Long id) {
		repository.deleteById(id);
	}

	public void remove(Long id) {
		Jogos j = this.findById(id);
		j.setStatus(StatusEnum.INATIVO);
		this.save(j);
	}

	public List<Jogos> findAllByStatus(StatusEnum status) {
		return repository.findAllByStatus(status);
	}

	public List<Jogos> search(String search, StatusEnum status) {
		return repository.search(search, status);
	}

	public Long count() {
		return repository.count();
	}

}
