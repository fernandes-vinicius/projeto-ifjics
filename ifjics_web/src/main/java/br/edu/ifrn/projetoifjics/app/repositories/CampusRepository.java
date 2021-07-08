package br.edu.ifrn.projetoifjics.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.edu.ifrn.projetoifjics.app.enums.StatusEnum;
import br.edu.ifrn.projetoifjics.app.models.Campus;

@Repository
public interface CampusRepository extends JpaRepository<Campus, Long> {

	@Query("SELECT c FROM Campus c WHERE status = ?1")
	List<Campus> findAllByStatus(StatusEnum status);
}
