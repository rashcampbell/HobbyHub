import React from 'react';

const Faq = () => {
    return (
        <div className='m-20'>
            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title font-semibold">How do I create an account?</div>
                <div className="collapse-content text-sm">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
            </div>
            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">I forgot my password. What should I do?</div>
                <div className="collapse-content text-sm">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
            </div>
            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold"> It is Subscription Ready?</div>
                <div className="collapse-content text-sm">Yes! At this moment the theme is compatible with YITH WooCommerce Subscription (Free & Pro) and also <br /> with most known subscriptions plugin for WooCommerce: WooCommerce Subscriptions.</div>
            </div>
            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">Do I Get Theme Support Post-Purchase?</div>
                <div className="collapse-content text-sm">Yes! By default, all of our items come with 6 months of included support (with options to extend the support to 12 months).</div>
            </div>
            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">Can I Use The Theme as a Normal Shop (Without Subscription)?</div>
                <div className="collapse-content text-sm">Yes! Simply deactivate the WITH WooCommerce Subscription plugin and the store will be a normal store. <br/> Note that you can also mix normal products (simple, variable, grouped, external/affiliate) with subscriptions products.</div>
            </div>
        </div>
    );
};

export default Faq;