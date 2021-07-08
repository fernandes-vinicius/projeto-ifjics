package br.edu.ifrn.projetoifjics.app.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.edu.ifrn.projetoifjics.app.enums.StatusEnum;
import br.edu.ifrn.projetoifjics.app.models.Polo;
import br.edu.ifrn.projetoifjics.app.repositories.PoloRepository;

@Service
public class PoloService {

	@Autowired
	private PoloRepository repository;

	public List<Polo> findAll() {
		return repository.findAll();
	}

	public Polo findById(Long id) {
		return repository.getOne(id);
	}

	public Polo save(Polo Polo) {
		return repository.saveAndFlush(Polo);
	}

	public void delete(Polo Polo) {
		repository.delete(Polo);
	}

	public void deleteById(Long id) {
		repository.deleteById(id);
	}

	public void remove(Long id) {
		Polo p = this.findById(id);
		p.setStatus(StatusEnum.INATIVO);
		this.save(p);
	}

	public List<Polo> findAllByStatus(StatusEnum status) {
		return repository.findAllByStatus(status);
	}

	public Long count() {
		return repository.count();
	}

}
