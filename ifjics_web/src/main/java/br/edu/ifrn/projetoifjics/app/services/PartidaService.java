package br.edu.ifrn.projetoifjics.app.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.edu.ifrn.projetoifjics.app.enums.StatusEnum;
import br.edu.ifrn.projetoifjics.app.models.Partida;
import br.edu.ifrn.projetoifjics.app.repositories.PartidaRepository;

@Service
public class PartidaService {

	@Autowired
	private PartidaRepository repository;

	public List<Partida> findAll() {
		return repository.findAll();
	}

	public Partida findById(Long id) {
		return repository.getOne(id);
	}

	public Partida save(Partida Partida) {
		return repository.saveAndFlush(Partida);
	}

	public void delete(Partida Partida) {
		repository.delete(Partida);
	}

	public void deleteById(Long id) { 
		repository.deleteById(id);
	}

	public void remove(Long id) {
		Partida c = this.findById(id);
		c.setStatus(StatusEnum.INATIVO);
		this.save(c);
	}

	public List<Partida> findAllByStatus(StatusEnum status) {
		return repository.findAllByStatus(status);
	}

	public List<Partida> findAllByCompeticao(Long id, StatusEnum status) {
		return repository.findAllByCompeticao(id, status);
	}

	public List<Partida> search(String search, StatusEnum status) {
		return repository.search(search, status);
	}

	public Long count() {
		return repository.count();
	}

}
