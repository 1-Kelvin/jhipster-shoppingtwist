package at.fhv.shoppingtwist.service;

import at.fhv.shoppingtwist.domain.Shopper;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Shopper}.
 */
public interface ShopperService {

    /**
     * Save a shopper.
     *
     * @param shopper the entity to save.
     * @return the persisted entity.
     */
    Shopper save(Shopper shopper);

    /**
     * Get all the shoppers.
     *
     * @return the list of entities.
     */
    List<Shopper> findAll();


    /**
     * Get the "id" shopper.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Shopper> findOne(Long id);

    /**
     * Delete the "id" shopper.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
