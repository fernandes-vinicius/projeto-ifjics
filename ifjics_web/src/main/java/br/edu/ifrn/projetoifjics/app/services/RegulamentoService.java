package br.edu.ifrn.projetoifjics.app.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.edu.ifrn.projetoifjics.app.enums.StatusEnum;
import br.edu.ifrn.projetoifjics.app.models.Regulamento;
import br.edu.ifrn.projetoifjics.app.repositories.RegulamentoRepository;

@Service
public class RegulamentoService {

	@Autowired
	private RegulamentoRepository repository;

	public List<Regulamento> findAll() {
		return repository.findAll();
	}

	public Regulamento findById(Long id) {
		return repository.getOne(id);
	}

	public Regulamento save(Regulamento regulamento) {
		return repository.saveAndFlush(regulamento);
	}

	public void delete(Regulamento regulamento) {
		repository.delete(regulamento);
	}

	public void deleteById(Long id) {
		repository.deleteById(id);
	}

	public void remove(Long id) {
		Regulamento r = this.findById(id);
		r.setStatus(StatusEnum.INATIVO);
		this.save(r);
	}

	public List<Regulamento> findAllByStatus(StatusEnum status) {
		return repository.findAllByStatus(status);
	}

	public Long count() {
		return repository.count();
	}

}
