package at.fhv.shoppingtwist.repository;

import at.fhv.shoppingtwist.domain.Shopper;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Shopper entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ShopperRepository extends JpaRepository<Shopper, Long> {

}
