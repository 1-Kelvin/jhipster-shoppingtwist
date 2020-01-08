package at.fhv.shoppingtwist.service;

import at.fhv.shoppingtwist.domain.Category;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Category}.
 */
public interface CategoryService {

    /**
     * Save a category.
     *
     * @param category the entity to save.
     * @return the persisted entity.
     */
    Category save(Category category);

    /**
     * Get all the categories.
     *
     * @return the list of entities.
     */
    List<Category> findAll();


    /**
     * Get the "id" category.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Category> findOne(Long id);

    /**
     * Delete the "id" category.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
