package br.edu.ifrn.projetoifjics.app.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.edu.ifrn.projetoifjics.app.enums.StatusEnum;
import br.edu.ifrn.projetoifjics.app.models.User;
import br.edu.ifrn.projetoifjics.app.repositories.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository repository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public List<User> findAll() {
		return repository.findAll();
	}

	public User findById(Long id) {
		return repository.getOne(id);
	}

	public User save(User user) {
		if (user.getId() == null)
			user.setPassword(passwordEncoder.encode(user.getPassword()));
		return repository.saveAndFlush(user);
	}

	public void delete(User user) {
		repository.delete(user);
	}

	public void deleteById(Long id) {
		repository.deleteById(id);
	}

	public void remove(Long id) {
		User u = this.findById(id);
		u.setStatus(StatusEnum.INATIVO);
		this.save(u);
	}

	public User findByUsername(String username) {
		return repository.findByUsername(username);
	}

	public User findByUsernameOrEmailOrTelefone(String login, StatusEnum status) {
		return repository.findByUsernameOrEmail(login.toLowerCase(), status);
	}

	public List<User> findAllByStatus(StatusEnum status) {
		return repository.findAllByStatus(status);
	}

	public List<User> search(String search, StatusEnum status) {
		return repository.search(search, status);
	}

	public Long count() {
		return repository.count();
	}

}
