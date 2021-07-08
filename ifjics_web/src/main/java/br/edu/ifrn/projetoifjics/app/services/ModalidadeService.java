package br.edu.ifrn.projetoifjics.app.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.edu.ifrn.projetoifjics.app.enums.StatusEnum;
import br.edu.ifrn.projetoifjics.app.models.Modalidade;
import br.edu.ifrn.projetoifjics.app.repositories.ModalidadeRepository;

@Service
public class ModalidadeService {

	@Autowired
	private ModalidadeRepository repository;

	public List<Modalidade> findAll() {
		return repository.findAll();
	}

	public Modalidade findById(Long id) {
		return repository.getOne(id);
	}

	public Modalidade save(Modalidade modalidade) {
		return repository.saveAndFlush(modalidade);
	}

	public void delete(Modalidade modalidade) {
		repository.delete(modalidade);
	}

	public void deleteById(Long id) {
		repository.deleteById(id);
	}

	public void remove(Long id) {
		Modalidade m = this.findById(id);
		m.setStatus(StatusEnum.INATIVO);
		this.save(m);
	}

	public List<Modalidade> findAllByStatus(StatusEnum status) {
		return repository.findAllByStatus(status);
	}

	public Long count() {
		return repository.count();
	}

}
