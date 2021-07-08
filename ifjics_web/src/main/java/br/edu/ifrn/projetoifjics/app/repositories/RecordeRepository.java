package br.edu.ifrn.projetoifjics.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.edu.ifrn.projetoifjics.app.enums.StatusEnum;
import br.edu.ifrn.projetoifjics.app.models.Recorde;

@Repository
public interface RecordeRepository extends JpaRepository<Recorde, Long> {

	@Query("SELECT r FROM Recorde r WHERE status = ?1")
	List<Recorde> findAllByStatus(StatusEnum status);
}