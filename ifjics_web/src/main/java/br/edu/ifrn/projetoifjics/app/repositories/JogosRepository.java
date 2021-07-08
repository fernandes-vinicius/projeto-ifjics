package br.edu.ifrn.projetoifjics.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.edu.ifrn.projetoifjics.app.enums.StatusEnum;
import br.edu.ifrn.projetoifjics.app.models.Jogos;

@Repository
public interface JogosRepository extends JpaRepository<Jogos, Long> {

	@Query("SELECT j FROM Jogos j WHERE status = ?1")
	List<Jogos> findAllByStatus(StatusEnum status);

	@Query(value = "SELECT j FROM Jogos j WHERE LOWER(nome) LIKE ?1 AND status = ?2")
	List<Jogos> search(String search, StatusEnum status);
}
