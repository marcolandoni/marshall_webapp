#!/usr/local/bin/python
# encoding: utf-8
"""
*The data model module for the `transients_element_history_put` resource*

:Author:
    David Young

:Date Created:
    November 27, 2014
"""
import sys
import os
import khufu


class models_transients_element_history_put():
    """
    The worker class for the models_transients_element_history_put module

    **Key Arguments:**
        - ``log`` -- logger
        - ``request`` -- the pyramid request
        - ``elementId`` -- the specific element id requests (or False)
        - ``search`` -- is this a search request (boolean)
    """

    def __init__(
        self,
        log,
        request,
        elementId=False,
        search=False
    ):
        self.log = log
        self.request = request
        self.elementId = elementId
        self.search = search
        self.qs = dict(request.params)  # the query string
        # the query string defaults
        self.defaultQs = {}
        # xt-self-arg-tmpx

        log.debug(
            "instansiating a new 'models_transients_element_history_put' object")

        self._set_default_parameters()

        return None

    def close(self):
        del self
        return None

    def put(self):
        """execute the put method on the models_transients_element_history_put object

        **Return:**
            - ``responseContent`` -- the reponse to send to the browser
        """
        self.log.debug('starting the ``put`` method')

        elementId = self.elementId

        responseContent = "Response from <code>" + __name__ + "</code><BR><BR>"
        if elementId:
            responseContent = "%(responseContent)sThe element selected was </code>%(elementId)s</code>" % locals(
            )
        else:
            responseContent = "%(responseContent)sResource Context selected (no element)" % locals(
            )

        self.log.debug('completed the ``put`` method')
        return responseContent

    def _set_default_parameters(
            self):
        """ set default parameters
        """
        self.log.debug('starting the ``_set_default_parameters`` method')

        for k, v in self.defaultQs.items():
            if k not in self.qs:
                self.qs[k] = v

        self.log.debug('completed the ``_set_default_parameters`` method')
        return None

    # method-override-tmpx
