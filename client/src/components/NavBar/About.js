import React, { Fragment } from 'react';

const About = () => {
  return (
    <Fragment>
      <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header d-flex justify-content-between">
                    <h4 class="modal-title">About!</h4>
                  </div>
                  <div class="modal-body">
                    <p>This was a very simple web app I have created as part of the codecademy Full Stack course I undertook in 2021.  The purpose of this exercise was to get me to put together my knowledge of JS Node, Express and postgresql into one application and for that application to be live.  The exercise is not about the front-end and so I have kept this very simple indeed.</p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                </div>
        </div>
    </Fragment>
  )
}

export default About;