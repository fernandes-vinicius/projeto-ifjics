package br.edu.ifrn.projetoifjics.app.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.edu.ifrn.projetoifjics.app.enums.StatusEnum;
import br.edu.ifrn.projetoifjics.app.models.Competicao;
import br.edu.ifrn.projetoifjics.app.repositories.CompeticaoRepository;

@Service
public class CompeticaoService {

	@Autowired
	private CompeticaoRepository repository;

	public List<Competicao> findAll() {
		return repository.findAll();
	}

	public Competicao findById(Long id) {
		return repository.getOne(id);
	}

	public Competicao save(Competicao competicao) {
		return repository.saveAndFlush(competicao);
	}

	public void delete(Competicao competicao) {
		repository.delete(competicao);
	}

	public void deleteById(Long id) {
		repository.deleteById(id);
	}

	public void remove(Long id) {
		Competicao c = this.findById(id);
		c.setStatus(StatusEnum.INATIVO);
		this.save(c);
	}

	public List<Competicao> findAllByStatus(StatusEnum status) {
		return repository.findAllByStatus(status);
	}

	public List<Competicao> findAllByJogos(Long id, StatusEnum status) {
		return repository.findAllByJogos(id, status);
	}

	public Long count() {
		return repository.count();
	}

	public List<Competicao> search(String search, StatusEnum status) {
		return repository.search(search, status);
	}

}
