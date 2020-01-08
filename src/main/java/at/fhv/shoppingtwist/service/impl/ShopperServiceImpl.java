package at.fhv.shoppingtwist.service.impl;

import at.fhv.shoppingtwist.service.ShopperService;
import at.fhv.shoppingtwist.domain.Shopper;
import at.fhv.shoppingtwist.repository.ShopperRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Shopper}.
 */
@Service
@Transactional
public class ShopperServiceImpl implements ShopperService {

    private final Logger log = LoggerFactory.getLogger(ShopperServiceImpl.class);

    private final ShopperRepository shopperRepository;

    public ShopperServiceImpl(ShopperRepository shopperRepository) {
        this.shopperRepository = shopperRepository;
    }

    /**
     * Save a shopper.
     *
     * @param shopper the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Shopper save(Shopper shopper) {
        log.debug("Request to save Shopper : {}", shopper);
        return shopperRepository.save(shopper);
    }

    /**
     * Get all the shoppers.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Shopper> findAll() {
        log.debug("Request to get all Shoppers");
        return shopperRepository.findAll();
    }


    /**
     * Get one shopper by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Shopper> findOne(Long id) {
        log.debug("Request to get Shopper : {}", id);
        return shopperRepository.findById(id);
    }

    /**
     * Delete the shopper by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Shopper : {}", id);
        shopperRepository.deleteById(id);
    }
}
