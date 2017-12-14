<template>
	<div>
		<div class="animated fadeIn">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<div class="card">
							<div class="card-block">
								<div class="p-15">
									<button class="btn btn-primary pull-right" @click="create()"><i class="ti-plus"></i> Create</button>
									<h4 class="card-title">Permission</h4>

									<!-- search -->
									<div class="row">
										<div class="col-md-3">
											<input type="text" class="form-control" placeholder="Search" v-model="search" @keyup="getSearch()">
										</div>
									</div>
									<!-- search -->

									<!-- end loading -->
									<!-- start alert -->
									<div class="text-center" v-if="error">
										<p class="lead">Something wrong when loading data</p>
										<button class="btn btn-primary" @click="index()"><i class="ti-reload"></i> Reload</button>
									</div>
								</div>
								<!-- end alert -->
								<div class="table-responsive animated fadeIn">
									<div class="spinner" v-if="loadings.items"></div>
									<table class="table table-striped" style="margin-bottom:10">
										<thead>
											<tr>
												<th>No</th>
												<th>Name</th>
												<th>Created At</th>
												<th>#</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="(item, key) in items.data" :index="key">
												<td>{{ key+1 }} </td>
												<td>{{ item.name }} </td>
												<td>{{ date("DD/MM/YYYY", item.created_at) }} </td>
												<td>
													<button class="btn btn-link" @click="edit(item)"><i class="ti-pencil"></i> Edit</button>
													<button class="btn btn-link text-danger" @click="destroy(item.id)"><i class="ti-trash"></i> Delete</button>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								<!-- pagination -->
								<div class="p-15" v-if="items.data">
									<div class="pull-left">
										<form action="javascript:void(0)" class="form-inline">
											<select v-model="perPage" @change="index()" id="" class="form-control">
												<option>10</option>
												<option>25</option>
												<option>50</option>
												<option>100</option>
											</select>
											&nbsp;
											Row per page 
										</form>
									</div>
									<div class="pull-right">
										<paginate :page-count="items.last_page" :page-range="3" :click-handler="paging" :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'" :page-class="'page-item'" next-link-class='page-link' prev-link-class='page-link' :page-link-class="'page-link'"></paginate>
									</div>
									<div class="clearfix"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Start modal -->
		<div class="modal fade" id="modal" tabindex="-1" role="dialog">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title"><i v-if="modal.icon" :class="modal.icon"></i> {{ modal.title }} Permission</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<form @submit.prevent="submit()">
						<div class="modal-body">
							<div class="form-group">
								<label for="name">Name</label>
								<input type="text" class="form-control" :class="{'is-invalid':form.errors.name}" v-model="form.name"id="name" name="name">
								<div class="invalid-feedback" v-if="form.errors.name">
									<p v-for="error in form.errors.name">{{ error }}</p>
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<button type="submit" class="btn btn-primary"><i class="ti-save"></i> Save</button>
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
						</div>
					</form>
				</div>
			</div>
		</div>
		<!-- end modal -->
	</div>
</template>

<script>
export default {
	head: {
		title: {
			inner: 'Permission',
			separator: '-'
		}
	},
	data () {
		return {
			url: '/dashboard/api/management/permission',
			error: '',
			perPage: 10,
			loadings: {
				items: true,
			},
			search: '',
			items: [],
			// define model
			form: {
				id: '',
				name: '',
				errors: []
			},
			columns: ['No','Name','#'],
			modal: {
				title: 'Create',
				icon: 'ti-plus',
				action: 'create'
			},
			timer: null
		}
	},

	mounted () {
		this.index();
	},

	methods: {
		index (paging=null, loading=true) {
			this.loadings.items = loading;
			this.error = '';
			let page = '';
			if (paging) {
				page = '&page='+paging;
			}
			axios.get(this.url+'?search='+this.search+'&row='+this.perPage+page)
			.then(response => {
				this.items = response.data;
				this.loadings.items = false;
			})
			.catch(error => {
				this.loadings.items = false;
				this.error = error;
			});
		},

		getSearch () {
			this.loadings.items = true;
			if (this.timer) {
				clearTimeout(this.timer);
			}
			this.timer = setTimeout(() => {
				this.index();
			}, 500)
		},

		create () {
			this.modal.title = 'Create';
			this.modal.icon = 'ti-plus';
			this.modal.action = 'create';
			this.form.name = '';
			this.form.errors = [];
			$('#modal').modal('show');
		},

		edit (data) {
			this.modal.title = 'Edit';
			this.modal.icon = 'ti-pencil';
			this.modal.action = 'edit';
			this.form.id = data.id;
			this.form.name = data.name;
			this.form.errors = [];
			$('#modal').modal('show');
		},

		destroy (id) {
			swal({
				title: 'Are you sure?',
				text: "You won't be able to revert this!",
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!'
			}).then((result) => {
				if (result.value) {
					axios.delete(this.url+'/'+id)
					.then(response => {
						this.index();
						toastr.success('Data has been deleted!', 'Success!', {
							progressBar: true,
							timeOut: 3000,
						});
					});
				}
			})

		},

		submit () {
			if (this.modal.action=='create') {
				this.request('post',this.url+'',this.form, '#modal');
			} else {
				this.request('put',this.url+'/'+this.form.id,this.form, '#modal');
			}
		},

		paging (pageNum) {
			this.index(pageNum);
		},

		request(method, uri, form, modal) {
			form.errors = [];

			axios[method](uri, form)
			.then(response => {
				this.index();

				form.name = '';
				form.errors = [];

				$(modal).modal('hide');
			})
			.catch(error => {
				if (typeof error.response.data === 'object') {
					form.errors = error.response.data;
				} else {
					form.errors = ['Something went wrong. Please try again.'];
				}
			});
		},
	}
}
</script>