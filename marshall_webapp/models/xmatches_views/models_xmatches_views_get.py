#!/usr/local/bin/python
# encoding: utf-8
"""
*The model get for the `models_xmatches_views_get.py` resource*

:Author:
    David Young

:Date Created:
    October 9, 2014
"""
import sys
import os
import khufu
import collections
import urllib
import re


class models_xmatches_views_get():
    """
    The worker class for the models_xmatches_views_get module

    **Key Arguments:**
        - ``log`` -- logger
        - ``request`` -- the pyramid request
        - ``elementId`` -- the specific element id requests (or False)
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
        self.defaultQs = {
            "sortBy": "top_ranked_transient_associations",
            "sortDesc": True
        }

        log.debug(
            "instansiating a new 'models_xmatches_views_get' object")

        self._set_default_parameters()

        return None

    def get(self):
        """execute the get method on the models_xmatches_views_get object

        **Return:**
            - ``responseContent`` -- the reponse to send to the browser
        """
        self.log.debug('starting the ``get`` method')

        sortBy = self.qs["sortBy"]
        if self.qs["sortDesc"] == True or self.qs["sortDesc"].lower() == "true":
            sortDesc = "desc"
        else:
            sortDesc = ""

        sqlQuery = u"""
            select * from tcs_stats_catalogues where transientStream = 0 order by %(sortBy)s %(sortDesc)s
        """ % locals()
        objectDataTmp = self.request.db.execute(sqlQuery).fetchall()
        objectData = []
        objectData[:] = [dict(zip(row.keys(), row)) for row in objectDataTmp]

        responseContent = objectData

        self.log.debug('completed the ``get`` method')
        return responseContent

    def _set_default_parameters(
            self):
        """ set default parameters
        """
        self.log.debug('starting the ``_set_default_parameters`` method')

        for k, v in self.defaultQs.iteritems():
            if k not in self.qs:
                self.qs[k] = v

        self.log.debug('completed the ``_set_default_parameters`` method')
        return None

    # xt-class-method
