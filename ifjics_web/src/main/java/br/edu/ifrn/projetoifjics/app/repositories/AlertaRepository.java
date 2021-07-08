package br.edu.ifrn.projetoifjics.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.edu.ifrn.projetoifjics.app.enums.StatusEnum;
import br.edu.ifrn.projetoifjics.app.models.Alerta;

@Repository
public interface AlertaRepository extends JpaRepository<Alerta, Long> {

	@Query("SELECT a FROM Alerta a WHERE status = ?1")
	List<Alerta> findAllByStatus(StatusEnum status);
}
