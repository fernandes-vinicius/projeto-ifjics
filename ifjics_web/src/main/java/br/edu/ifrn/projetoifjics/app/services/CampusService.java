package br.edu.ifrn.projetoifjics.app.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.edu.ifrn.projetoifjics.app.enums.StatusEnum;
import br.edu.ifrn.projetoifjics.app.models.Campus;
import br.edu.ifrn.projetoifjics.app.repositories.CampusRepository;

@Service
public class CampusService {

	@Autowired
	private CampusRepository repository;

	public List<Campus> findAll() {
		return repository.findAll();
	}

	public Campus findById(Long id) {
		return repository.getOne(id);
	}

	public Campus save(Campus campus) {
		return repository.saveAndFlush(campus);
	}

	public void delete(Campus campus) {
		repository.delete(campus);
	}

	public void deleteById(Long id) {
		repository.deleteById(id);
	}

	public void remove(Long id) {
		Campus c = this.findById(id);
		c.setStatus(StatusEnum.INATIVO);
		this.save(c);
	}

	public List<Campus> findAllByStatus(StatusEnum status) {
		return repository.findAllByStatus(status);
	}

	public Long count() {
		return repository.count();
	}

}
