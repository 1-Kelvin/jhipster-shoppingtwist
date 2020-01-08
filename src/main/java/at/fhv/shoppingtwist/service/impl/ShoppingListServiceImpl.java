package at.fhv.shoppingtwist.service.impl;

import at.fhv.shoppingtwist.service.ShoppingListService;
import at.fhv.shoppingtwist.domain.ShoppingList;
import at.fhv.shoppingtwist.repository.ShoppingListRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link ShoppingList}.
 */
@Service
@Transactional
public class ShoppingListServiceImpl implements ShoppingListService {

    private final Logger log = LoggerFactory.getLogger(ShoppingListServiceImpl.class);

    private final ShoppingListRepository shoppingListRepository;

    public ShoppingListServiceImpl(ShoppingListRepository shoppingListRepository) {
        this.shoppingListRepository = shoppingListRepository;
    }

    /**
     * Save a shoppingList.
     *
     * @param shoppingList the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ShoppingList save(ShoppingList shoppingList) {
        log.debug("Request to save ShoppingList : {}", shoppingList);
        return shoppingListRepository.save(shoppingList);
    }

    /**
     * Get all the shoppingLists.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ShoppingList> findAll(Pageable pageable) {
        log.debug("Request to get all ShoppingLists");
        return shoppingListRepository.findAll(pageable);
    }


    /**
     * Get one shoppingList by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ShoppingList> findOne(Long id) {
        log.debug("Request to get ShoppingList : {}", id);
        return shoppingListRepository.findById(id);
    }

    /**
     * Delete the shoppingList by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ShoppingList : {}", id);
        shoppingListRepository.deleteById(id);
    }
}
