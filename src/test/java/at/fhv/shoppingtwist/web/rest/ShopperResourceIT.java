package at.fhv.shoppingtwist.web.rest;

import at.fhv.shoppingtwist.ShoppingTwistApp;
import at.fhv.shoppingtwist.domain.Shopper;
import at.fhv.shoppingtwist.repository.ShopperRepository;
import at.fhv.shoppingtwist.service.ShopperService;
import at.fhv.shoppingtwist.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static at.fhv.shoppingtwist.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ShopperResource} REST controller.
 */
@SpringBootTest(classes = ShoppingTwistApp.class)
public class ShopperResourceIT {

    private static final String DEFAULT_DISPLAY_NAME = "AAAAAAAAAA";
    private static final String UPDATED_DISPLAY_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PHONE_NUMBER = "BBBBBBBBBB";

    @Autowired
    private ShopperRepository shopperRepository;

    @Autowired
    private ShopperService shopperService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restShopperMockMvc;

    private Shopper shopper;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ShopperResource shopperResource = new ShopperResource(shopperService);
        this.restShopperMockMvc = MockMvcBuilders.standaloneSetup(shopperResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Shopper createEntity(EntityManager em) {
        Shopper shopper = new Shopper()
            .displayName(DEFAULT_DISPLAY_NAME)
            .phoneNumber(DEFAULT_PHONE_NUMBER);
        return shopper;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Shopper createUpdatedEntity(EntityManager em) {
        Shopper shopper = new Shopper()
            .displayName(UPDATED_DISPLAY_NAME)
            .phoneNumber(UPDATED_PHONE_NUMBER);
        return shopper;
    }

    @BeforeEach
    public void initTest() {
        shopper = createEntity(em);
    }

    @Test
    @Transactional
    public void createShopper() throws Exception {
        int databaseSizeBeforeCreate = shopperRepository.findAll().size();

        // Create the Shopper
        restShopperMockMvc.perform(post("/api/shoppers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shopper)))
            .andExpect(status().isCreated());

        // Validate the Shopper in the database
        List<Shopper> shopperList = shopperRepository.findAll();
        assertThat(shopperList).hasSize(databaseSizeBeforeCreate + 1);
        Shopper testShopper = shopperList.get(shopperList.size() - 1);
        assertThat(testShopper.getDisplayName()).isEqualTo(DEFAULT_DISPLAY_NAME);
        assertThat(testShopper.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);
    }

    @Test
    @Transactional
    public void createShopperWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = shopperRepository.findAll().size();

        // Create the Shopper with an existing ID
        shopper.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restShopperMockMvc.perform(post("/api/shoppers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shopper)))
            .andExpect(status().isBadRequest());

        // Validate the Shopper in the database
        List<Shopper> shopperList = shopperRepository.findAll();
        assertThat(shopperList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllShoppers() throws Exception {
        // Initialize the database
        shopperRepository.saveAndFlush(shopper);

        // Get all the shopperList
        restShopperMockMvc.perform(get("/api/shoppers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(shopper.getId().intValue())))
            .andExpect(jsonPath("$.[*].displayName").value(hasItem(DEFAULT_DISPLAY_NAME)))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER)));
    }
    
    @Test
    @Transactional
    public void getShopper() throws Exception {
        // Initialize the database
        shopperRepository.saveAndFlush(shopper);

        // Get the shopper
        restShopperMockMvc.perform(get("/api/shoppers/{id}", shopper.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(shopper.getId().intValue()))
            .andExpect(jsonPath("$.displayName").value(DEFAULT_DISPLAY_NAME))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER));
    }

    @Test
    @Transactional
    public void getNonExistingShopper() throws Exception {
        // Get the shopper
        restShopperMockMvc.perform(get("/api/shoppers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateShopper() throws Exception {
        // Initialize the database
        shopperService.save(shopper);

        int databaseSizeBeforeUpdate = shopperRepository.findAll().size();

        // Update the shopper
        Shopper updatedShopper = shopperRepository.findById(shopper.getId()).get();
        // Disconnect from session so that the updates on updatedShopper are not directly saved in db
        em.detach(updatedShopper);
        updatedShopper
            .displayName(UPDATED_DISPLAY_NAME)
            .phoneNumber(UPDATED_PHONE_NUMBER);

        restShopperMockMvc.perform(put("/api/shoppers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedShopper)))
            .andExpect(status().isOk());

        // Validate the Shopper in the database
        List<Shopper> shopperList = shopperRepository.findAll();
        assertThat(shopperList).hasSize(databaseSizeBeforeUpdate);
        Shopper testShopper = shopperList.get(shopperList.size() - 1);
        assertThat(testShopper.getDisplayName()).isEqualTo(UPDATED_DISPLAY_NAME);
        assertThat(testShopper.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
    }

    @Test
    @Transactional
    public void updateNonExistingShopper() throws Exception {
        int databaseSizeBeforeUpdate = shopperRepository.findAll().size();

        // Create the Shopper

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restShopperMockMvc.perform(put("/api/shoppers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shopper)))
            .andExpect(status().isBadRequest());

        // Validate the Shopper in the database
        List<Shopper> shopperList = shopperRepository.findAll();
        assertThat(shopperList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteShopper() throws Exception {
        // Initialize the database
        shopperService.save(shopper);

        int databaseSizeBeforeDelete = shopperRepository.findAll().size();

        // Delete the shopper
        restShopperMockMvc.perform(delete("/api/shoppers/{id}", shopper.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Shopper> shopperList = shopperRepository.findAll();
        assertThat(shopperList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
