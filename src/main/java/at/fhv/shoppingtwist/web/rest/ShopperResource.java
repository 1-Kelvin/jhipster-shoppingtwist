package at.fhv.shoppingtwist.web.rest;

import at.fhv.shoppingtwist.domain.Shopper;
import at.fhv.shoppingtwist.service.ShopperService;
import at.fhv.shoppingtwist.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link at.fhv.shoppingtwist.domain.Shopper}.
 */
@RestController
@RequestMapping("/api")
public class ShopperResource {

    private final Logger log = LoggerFactory.getLogger(ShopperResource.class);

    private static final String ENTITY_NAME = "shopper";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ShopperService shopperService;

    public ShopperResource(ShopperService shopperService) {
        this.shopperService = shopperService;
    }

    /**
     * {@code POST  /shoppers} : Create a new shopper.
     *
     * @param shopper the shopper to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new shopper, or with status {@code 400 (Bad Request)} if the shopper has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/shoppers")
    public ResponseEntity<Shopper> createShopper(@RequestBody Shopper shopper) throws URISyntaxException {
        log.debug("REST request to save Shopper : {}", shopper);
        if (shopper.getId() != null) {
            throw new BadRequestAlertException("A new shopper cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Shopper result = shopperService.save(shopper);
        return ResponseEntity.created(new URI("/api/shoppers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /shoppers} : Updates an existing shopper.
     *
     * @param shopper the shopper to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated shopper,
     * or with status {@code 400 (Bad Request)} if the shopper is not valid,
     * or with status {@code 500 (Internal Server Error)} if the shopper couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/shoppers")
    public ResponseEntity<Shopper> updateShopper(@RequestBody Shopper shopper) throws URISyntaxException {
        log.debug("REST request to update Shopper : {}", shopper);
        if (shopper.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Shopper result = shopperService.save(shopper);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, shopper.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /shoppers} : get all the shoppers.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of shoppers in body.
     */
    @GetMapping("/shoppers")
    public List<Shopper> getAllShoppers() {
        log.debug("REST request to get all Shoppers");
        return shopperService.findAll();
    }

    /**
     * {@code GET  /shoppers/:id} : get the "id" shopper.
     *
     * @param id the id of the shopper to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the shopper, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/shoppers/{id}")
    public ResponseEntity<Shopper> getShopper(@PathVariable Long id) {
        log.debug("REST request to get Shopper : {}", id);
        Optional<Shopper> shopper = shopperService.findOne(id);
        return ResponseUtil.wrapOrNotFound(shopper);
    }

    /**
     * {@code DELETE  /shoppers/:id} : delete the "id" shopper.
     *
     * @param id the id of the shopper to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/shoppers/{id}")
    public ResponseEntity<Void> deleteShopper(@PathVariable Long id) {
        log.debug("REST request to delete Shopper : {}", id);
        shopperService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
