package br.edu.ifrn.projetoifjics.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.edu.ifrn.projetoifjics.app.enums.StatusEnum;
import br.edu.ifrn.projetoifjics.app.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	User findByUsername(String username);

	@Query("SELECT u FROM User u WHERE (LOWER(username) = ?1 OR LOWER(email) = ?1) AND status = ?2")
	User findByUsernameOrEmail(String login, StatusEnum status);

	@Query("SELECT u FROM User u WHERE status = ?1") 
	List<User> findAllByStatus(StatusEnum status);

	@Query(value = "SELECT u FROM User u WHERE (LOWER(username) LIKE ?1 OR LOWER(email) LIKE ?1 OR LOWER(nome) LIKE ?1 OR telefone LIKE ?1) AND status = ?2")
	List<User> search(String search, StatusEnum status);
}
