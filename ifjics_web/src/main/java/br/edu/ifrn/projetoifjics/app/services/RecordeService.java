package br.edu.ifrn.projetoifjics.app.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.edu.ifrn.projetoifjics.app.enums.StatusEnum;
import br.edu.ifrn.projetoifjics.app.models.Recorde;
import br.edu.ifrn.projetoifjics.app.repositories.RecordeRepository;

@Service
public class RecordeService {

	@Autowired
	private RecordeRepository repository;

	public List<Recorde> findAll() {
		return repository.findAll();
	}

	public Recorde findById(Long id) {
		return repository.getOne(id);
	}

	public Recorde save(Recorde Recorde) {
		return repository.saveAndFlush(Recorde);
	}

	public void delete(Recorde Recorde) {
		repository.delete(Recorde);
	}

	public void deleteById(Long id) {
		repository.deleteById(id);
	}

	public void remove(Long id) {
		Recorde r = this.findById(id);
		r.setStatus(StatusEnum.INATIVO);
		this.save(r);
	}

	public List<Recorde> findAllByStatus(StatusEnum status) {
		return repository.findAllByStatus(status);
	}

	public Long count() {
		return repository.count();
	}

}
