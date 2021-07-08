package br.edu.ifrn.projetoifjics.app.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.edu.ifrn.projetoifjics.app.enums.RoleEnum;
import br.edu.ifrn.projetoifjics.app.models.Role;
import br.edu.ifrn.projetoifjics.app.repositories.RoleRepository;

@Service
public class RoleService {

	@Autowired
	private RoleRepository repository;

	public List<Role> findAll() {
		return repository.findAll();
	}

	public Role findById(Long id) {
		return repository.getOne(id);
	}

	public Role save(Role role) {
		return repository.saveAndFlush(role);
	}

	public void delete(Role role) {
		repository.delete(role);
	}

	public void deleteById(Long id) {
		repository.deleteById(id);
	}

	public Role findByAuthority(RoleEnum authority) {
		return repository.findByAuthority(authority);
	}

	public Long count() {
		return repository.count();
	}

}
