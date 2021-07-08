package br.edu.ifrn.projetoifjics.app.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.edu.ifrn.projetoifjics.app.enums.StatusEnum;
import br.edu.ifrn.projetoifjics.app.models.Alerta;
import br.edu.ifrn.projetoifjics.app.repositories.AlertaRepository;

@Service
public class AlertaService {

	@Autowired
	private AlertaRepository repository;

	public List<Alerta> findAll() {
		return repository.findAll();
	}

	public Alerta findById(Long id) {
		return repository.getOne(id);
	}

	public Alerta save(Alerta Alerta) {
		return repository.saveAndFlush(Alerta);
	}

	public void delete(Alerta Alerta) {
		repository.delete(Alerta);
	}

	public void deleteById(Long id) {
		repository.deleteById(id);
	}

	public void remove(Long id) {
		Alerta c = this.findById(id);
		c.setStatus(StatusEnum.INATIVO);
		this.save(c);
	}

	public List<Alerta> findAllByStatus(StatusEnum status) {
		return repository.findAllByStatus(status);
	}

	public Long count() {
		return repository.count();
	}

}
